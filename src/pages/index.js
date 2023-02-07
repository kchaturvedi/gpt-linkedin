import { Coffee, Github, Heart, Twitter } from 'lucide-react'
import Head from 'next/head'
import { useState } from 'react'

const Index = ({}) => {
  const [isLoading, setLoading] = useState(false)
  const [inputText, setInput] = useState('')
  const [postText, setPostText] = useState([])
  const [hasCopied, setCopied] = useState(false)

  const getPost = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('/api/getPost', {
      method: 'POST',
      body: JSON.stringify({ input: `${inputText}.` }),
    })
    const data = await response.json()
    setPostText(data.text.filter((t) => t.length > 0))
    setLoading(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postText.join(' '))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareSheet = async () => {
    try {
      await navigator.share({ text: postText.join(' ') })
    } catch {}
  }

  return (
    <div>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black' />
        <meta name='robots' content='follow, index' />
        {/* <link rel='canonical' href={`https://ikartik.com${router.asPath}`} /> */}
        {/* <meta property='og:url' content={`https://ikartik.com${router.asPath}`} />
        <meta property='og:type' content={meta.type} /> */}
        <meta property='og:site_name' content='iKartik' />
        <meta property='og:description' content='Let GPT-3 help showcase your accomplishments in the best light on LinkedIn, no matter how big or small.' />
        <meta property='og:title' content='LinkedIn-ify' />
        <meta property='og:image' content='https://gpt-linkedin-ikartik.vercel.app/og.jpg' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@itskrtk' />
        <meta name='twitter:title' content='LinkedIn-ify' />
        <meta name='twitter:description' content='Let GPT-3 help showcase your accomplishments in the best light on LinkedIn, no matter how big or small.' />
        <meta name='twitter:image' content='https://gpt-linkedin-ikartik.vercel.app/og.jpg' />
        <meta name='description' content='Let GPT-3 help showcase your accomplishments in the best light on LinkedIn, no matter how big or small.' />
        <meta name='keywords' content='gpt,gpt-3,openai,chatgpt,linkedin,ai,ml,machine learning,artificial intelligence' />
        <title>LinkedIn-ify</title>
      </Head>
      <div>
        <div className='min-h-screen flex flex-col justify-between max-w-2xl p-5 md:p-10 mx-auto'>
          <nav className='flex justify-between mb-5 md:mb-16 w-full'>
            <span className='font-bold text-xl'>LinkedIn-ify</span>
            <span className='flex gap-3'>
              <a href='https://github.com/kchaturvedi/gpt-linkedin'>
                <Github />
              </a>
              <a href='https://twitter.com/itskrtk'>
                <Twitter />
              </a>
              <a href='https://ikartik.com'>
                <img src='kLogo.png' className='w-6 filter saturate-0' />
              </a>
            </span>
          </nav>
          <main className='flex-1 w-full'>
            <h1 className='text-2xl sm:text-4xl font-bold mb-5 text-center'>
              Share your achievement <br />
              the LinkedIn way
            </h1>
            <h2 className='text-lg sm:text-xl mb-10 text-center'>Let GPT-3 help showcase your accomplishments in the best light, no matter how big or small.</h2>
            <form className='flex flex-col w-full'>
              <label htmlFor='achievementText' className='pb-2'>
                Describe your achievement:
              </label>
              <textarea
                className='bg-slate-100 shadow-inner rounded-xl p-3 focus:outline-1 outline-sky-800 resize-none'
                id='achievementText'
                rows={4}
                type='text'
                aria-label='Enter your post here'
                aria-required='true'
                aria-invalid='false'
                value={inputText}
                placeholder='What did you accomplish? Thank someone. Inspire others.'
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className='mt-5 bg-sky-800 hover:bg-sky-900 text-gray-200 font-medium shadow p-2 rounded-xl duration-300 disabled:bg-gray-400'
                type='submit'
                disabled={inputText === ''}
                onClick={getPost}
              >
                LinkedIn-ify my post!
              </button>
            </form>
            {(isLoading || postText.length !== 0) && (
              <>
                <div className='mt-10 rounded-2xl shadow-xl p-5 bg-gradient-to-br from-slate-50 via-blue-50 to-neutral-100'>
                  {isLoading
                    ? 'Loading...'
                    : postText.map((t, i) => (
                        <p key={i} className='pb-2'>
                          {t}
                        </p>
                      ))}
                </div>
                {!isLoading && (
                  <div className='flex justify-around my-5'>
                    <button
                      className='bg-slate-100 hover:bg-slate-200 text-black font-medium shadow-lg py-4 px-8 rounded-xl duration-300 disabled:bg-teal-300'
                      disabled={hasCopied}
                      onClick={copyToClipboard}
                    >
                      {hasCopied ? 'Copied!' : 'Copy'}
                    </button>
                    <button className='bg-slate-100 hover:bg-slate-200 text-black font-medium shadow-lg py-4 px-8 rounded-xl duration-300 disabled:bg-teal-300' onClick={shareSheet}>
                      Share
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
          <div className='flex flex-col md:flex-row w-full mt-5 text-slate-500 justify-center items-center md:justify-between'>
            <div className='flex text-center gap-1'>
              Powered by{' '}
              <a href='https://openai.com' className='underline hover:text-black duration-300'>
                OpenAI
              </a>{' '}
              and{' '}
              <a href='https://vercel.com' className='underline hover:text-black duration-300'>
                Vercel
              </a>
            </div>
            <div className='flex text-center gap-1'>
              Made with <Heart /> and <Coffee />
              by{' '}
              <a href='https://ikartik.com' className='underline hover:text-black duration-300'>
                Kartik Chaturvedi
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
