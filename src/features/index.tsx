'use client';
import { Container } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CloseIcon from '@mui/icons-material/Close';
import { Heading } from '@components/Heading';

import text from '@shared/texts/index.json';
import { IconTextButton } from '@components/IconTextButton';
import { useState } from 'react';
import { Typography } from '@components/Typography';
import { Button } from '@components/Button';
import { Loader } from '@components/Loader';
import Head from 'next/head';

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': text.title,
    'url': 'https://your-domain.com/',
    'description': text.description,
  };

export const RootPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<{ msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleParaphrase = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/paraphrase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputValue }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Unknown error');
      }

      setResult(data.result);
      clearInputValue();
    } catch (err) {
      console.error('Paraphrase failed:', err);
      setError({ msg: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const isInputEmpty = inputValue.length === 0;
  const isResultEmpty = result.length === 0;

  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) =>
    setInputValue(e.currentTarget.value);

  const clearInputValue = () => setInputValue('');

  const handlePasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text);
    } catch (err) {
      console.error('Clipboard read failed', err);
      setError({ msg: JSON.stringify(err) });
    }
  };

  const BUTTONS = [
    {
      icon: <ContentPasteIcon />,
      label: text.pasteText,
      onClick: handlePasteText,
    },
    {
      icon: <TextSnippetIcon />,
      label: text.sampleText,
      onClick: () => setInputValue(text.textForPasting),
    },
  ];
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <section>
        <Container className="py-[32px] flex flex-col gap-[40px]">
          <Heading title={text.title} description={text.description} />
          <div className="w-full border-[#DBDCDF] border-[1px] rounded-[28px] overflow-hidden relative">
            {isInputEmpty && isResultEmpty && (
              <ul className="absolute z-10 grid grid-cols-2 gap-[16px] top-[50%] translate-[-50%] left-[50%]">
                {BUTTONS.map(item => (
                  <li key={item.label}>
                    <IconTextButton {...item} />
                  </li>
                ))}
              </ul>
            )}

            {isResultEmpty ? (
              <div className="relative w-full h-[336px]">
                <textarea
                  value={inputValue}
                  onInput={onInput}
                  name="text-field"
                  className="w-full h-full bg-[#EEF0F5] p-[16px] resize-none outline-none"
                  placeholder={text.inputPlaseholder}
                  disabled={loading}
                />
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-20">
                    <Loader />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-fit bg-white p-[16px]">
                <Typography as="p" variant={400}>
                  {result}
                </Typography>
              </div>
            )}

            {isResultEmpty && (
              <div className="w-full bg-white h-[64px] p-[8px] flex justify-end gap-[8px]">
                {!isInputEmpty && (
                  <Button
                    type="button"
                    variant="outlined"
                    className="w-fit flex justify-center items-center gap-[8px] px-[12px]"
                    disabled={isInputEmpty || loading}
                    onClick={clearInputValue}
                  >
                    <CloseIcon className="w-[13px] h-[13px]" />
                    <Typography
                      as="span"
                      className="text-[14px] text-center"
                      variant={600}
                    >
                      {text.clearInput}
                    </Typography>
                  </Button>
                )}

                <Button
                  type="button"
                  variant="filled"
                  disabled={isInputEmpty || loading}
                  onClick={handleParaphrase}
                >
                  <Typography as="span" className="text-[14px]" variant={600}>
                    {loading ? text.paraphrase.inProgress : text.paraphrase.start}
                  </Typography>
                </Button>
              </div>
            )}
          </div>
          {error && (
            <div>
              <Typography as="span" className="text-red" variant={400}>
                {error.msg}
              </Typography>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};
