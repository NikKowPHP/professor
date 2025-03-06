import { NextRequest, NextResponse } from 'next/server'
import { youtubeSectionService } from '@/lib/services/youtube-section.service'
import logger from '@/lib/logger'
import { CACHE_TAGS } from '@/lib/utils/cache';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    logger.log('GET request received for youtube section');
    const youtubeSection = await youtubeSectionService.getYoutubeSection()
    logger.log('router GET youtubeSection data ', youtubeSection);
    if (!youtubeSection) {
      return NextResponse.json({ message: 'Youtube section not found' }, { status: 404 })
    }
    return NextResponse.json(youtubeSection, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    logger.error(`Error fetching youtube section: ${error}`)
    return NextResponse.json({ message: 'Error fetching youtube section' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const updatedYoutubeSection = await youtubeSectionService.updateYoutubeSection(body)
    logger.log('router PUT updatedYoutubeSection data ' ,updatedYoutubeSection);
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

