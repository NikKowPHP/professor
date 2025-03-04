import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/utils/cache'
import { youtubeSectionService } from '@/lib/services/youtube-section.service'
import logger from '@/lib/logger'

export async function GET() {
  try {
    const youtubeSection = await youtubeSectionService.getYoutubeSection()
    if (!youtubeSection) {
      return NextResponse.json({ message: 'Youtube section not found' }, { status: 404 })
    }
    return NextResponse.json(youtubeSection)
  } catch (error) {
    logger.error(`Error fetching youtube section: ${error}`)
    return NextResponse.json({ message: 'Error fetching youtube section' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const updatedYoutubeSection = await youtubeSectionService.updateYoutubeSection(body)
    revalidateTag(CACHE_TAGS.YOUTUBE)
    return NextResponse.json(updatedYoutubeSection)
  } catch (error) {
    logger.error(`Error updating youtube section: ${error}`)
    return NextResponse.json({ message: 'Error updating youtube section' }, { status: 500 })
  }
}

export function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}

