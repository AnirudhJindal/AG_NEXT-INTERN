import React from 'react'
import { ShareIcon } from '../icons/Share'
import { TrashIcon } from '../icons/Trash'
import { Tweet } from '../icons/tweet'
import { YoutubeVideo } from '../icons/youtubeVideo'
import { Document } from '../icons/Document'

interface CardsInterface {
  title: string
  messageType: 'text' | 'youtube' | 'twitter'
  link?: string
}

const startIconVariants = {
  twitter: <Tweet size="md" color="#808080" />,
  youtube: <YoutubeVideo size="md" color="#808080" />,
  text: <Document size="md" color="#808080" />
}

const defaultCard =
  'flex flex-col border border-slate-200 rounded-lg max-w-80 bg-white shadow-md max-h-80'

export const CardsComponent = (props: CardsInterface) => {
  return (
    <div className={defaultCard}>
      {/* Header section with icon and title */}
      <div className="flex justify-center items-center w-full h-10 pt-4">
        <div className="bg-transparent w-1/6 p-2">
          {startIconVariants[props.messageType]}
        </div>
        <div className="bg-transparent grow">{props.title}</div>
        <div className="bg-transparent w-1/6">
          <ShareIcon size="md" color="#808080" />
        </div>
        <div className="bg-transparent w-1/6">
          <TrashIcon size="md" color="#808080" />
        </div>
      </div>

      {/* Content section (Tweet or YouTube Embed) */}
      <div className="w-full flex-1 px-2 py-2">
        {/* Twitter Embed */}
        {props.messageType === 'twitter' && props.link && (
          <div className="w-full">
            <blockquote 
              className="twitter-tweet" 
              style={{
                maxWidth: '100%',
                margin: 0,
                width: '100%'
              }}
            >
              <a href={props.link.replace("x.com" , "twitter.com")}></a>
            </blockquote>
          </div>
        )}

        {/* YouTube Embed */}
        {props.messageType === 'youtube' && props.link && (
          <iframe
            className="w-full aspect-video mt-2 rounded"
            src={props.link.replace('watch?v=', 'embed/')}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  )
}