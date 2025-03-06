import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/utils/cache'
import logger from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    // Revalidate all cache tags
    Object.values(CACHE_TAGS).forEach(tag => {
      revalidateTag(tag)
    })
    
    return NextResponse.json({ 
      revalidated: true, 
      message: 'Cache successfully revalidated' 
    })
  } catch (error) {
    logger.error(`Error revalidating cache: ${error}`)
    return NextResponse.json({ 
      revalidated: false,
      message: 'Error revalidating cache' 
    }, { status: 500 })
  }
}
