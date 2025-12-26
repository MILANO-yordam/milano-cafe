import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email va parol zarur" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Admin user yaratish
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        is_admin: true,
        role: "admin",
      },
      email_confirm: true,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // User RLS shunga muvofiq yaratiladi
    return NextResponse.json(
      {
        success: true,
        message: "Admin user muvaffaqiyatli yaratildi",
        user: {
          id: data.user.id,
          email: data.user.email,
          role: "admin",
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Admin creation error:", error)
    return NextResponse.json(
      { error: "Server xatosi" },
      { status: 500 }
    )
  }
}
