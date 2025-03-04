import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/utils/cache'
import { quoteSectionService } from '@/lib/services/quote-section.service'
import logger from '@/lib/logger'

export async function GET() {
  try {
    const quoteSection = await quoteSectionService.getQuoteSection()
    if (!quoteSection) {
      return NextResponse.json({ message: 'Quote section not found' }, { status: 404 })
    }
    return NextResponse.json(quoteSection)
  } catch (error) {
    logger.error(`Error fetching quote section: ${error}`)
    return NextResponse.json({ message: 'Error fetching quote section' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.id) {
      return NextResponse.json({ message: 'ID is required for updating quote section' }, { status: 400 });
    }
    const updatedQuoteSection = await quoteSectionService.updateQuoteSection(body.id, body)
    revalidateTag(CACHE_TAGS.QUOTE)
    return NextResponse.json(updatedQuoteSection)
  } catch (error) {
    logger.error(`Error updating quote section: ${error}`)
    return NextResponse.json({ message: 'Error updating quote section' }, { status: 500 })
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

