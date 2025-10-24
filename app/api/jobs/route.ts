import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "100";

    // Fetch jobs from backend
    const response = await fetch(
      `${BACKEND_URL}/api/post-job?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Don't cache to always get fresh data
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch jobs from backend",
          items: [],
          total: 0,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      items: data.items || [],
      total: data.total || 0,
      page: data.page || 1,
      pageSize: data.pageSize || 100,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        items: [],
        total: 0,
      },
      { status: 500 }
    );
  }
}
