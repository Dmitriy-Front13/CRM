import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'
import prisma from '@prisma/prisma'

export async function POST(req: Request) {
  const { fullName, password } = await req.json()

  const user = await prisma.employee.findFirst({
    where: { fullName, password }
  })

  if (!user) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: 404 }
    )
  }

  const token = sign(
    { fullName: user.fullName, position: user.position },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  )

  const response = NextResponse.json({
    fullName: user.fullName,
    position: user.position
  });

  (await cookies()).set('authToken', token, {
    httpOnly: true,
    // secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60
  })

  return response
}
