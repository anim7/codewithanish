import resetPassword from "./resetPassword"
import db from "db"
import { hash256, SecurePassword } from "blitz"

beforeEach(async () => {
  await db.$reset()
})

const mockCtx: any = {
  session: {
    $create: jest.fn,
  },
}

describe("resetPassword mutation", () => {
  it("works correctly", async () => {
    expect(true).toBe(true)

    const goodToken = "randomPasswordResetToken"
    const expiredToken = "expiredRandomPasswordResetToken"
    const future = new Date()
    future.setHours(future.getHours() + 4)
    const past = new Date()
    past.setHours(past.getHours() - 4)

    const user = await db.user.create({
      data: {
        email: "user@example.com",
        tokens: {
          create: [
            {
              type: "RESET_PASSWORD",
              hashedToken: hash256(expiredToken),
              expiresAt: past,
              sentTo: "user@example.com",
            },
            {
              type: "RESET_PASSWORD",
              hashedToken: hash256(goodToken),
              expiresAt: future,
              sentTo: "user@example.com",
            },
          ],
        },
      },
      include: { tokens: true },
    })

    const newPassword = "newPassword"

    await expect(
      resetPassword({ token: "no-token", password: "", passwordConfirmation: "" }, mockCtx)
    ).rejects.toThrowError()

    await expect(
      resetPassword(
        { token: expiredToken, password: newPassword, passwordConfirmation: newPassword },
        mockCtx
      )
    ).rejects.toThrowError()

    await resetPassword(
      { token: goodToken, password: newPassword, passwordConfirmation: newPassword },
      mockCtx
    )

    const numberOfTokens = await db.token.count({ where: { userId: user.id } })
    expect(numberOfTokens).toBe(0)

    const updatedUser = await db.user.findFirst({ where: { id: user.id } })
    expect(await SecurePassword.verify(updatedUser!.hashedPassword, newPassword)).toBe(
      SecurePassword.VALID
    )
  })
})
