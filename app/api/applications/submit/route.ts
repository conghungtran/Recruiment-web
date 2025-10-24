import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Forward to backend
    const response = await fetch(`${BACKEND_URL}/api/upload-cv`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Failed to submit application",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      data: data.data,
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
