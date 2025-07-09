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
import { paraphraseText } from '@/services/OpenAi';

const BUTTONS = [
  {
    icon: <ContentPasteIcon />,
    label: text.pasteText,
    onClick: () => console.log('Paste text'),
  },
  {
    icon: <TextSnippetIcon />,
    label: text.sampleText,
    onClick: () => console.log('Sample text'),
  },
];

export const RootPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<{ msg: string } | null>(null);

  const isInputEmpty = inputValue.length === 0;
  const isResultEmpty = result.length === 0;

  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) =>
    setInputValue(e.currentTarget.value);

  const clearInputValue = () => setInputValue('');

  const handleParaphrase = async () => {
    const output = await paraphraseText(inputValue);
    setResult(output);
    clearInputValue();
  };

  return (
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
            <textarea
              value={inputValue}
              onInput={onInput}
              name="text-field"
              className="w-full h-[336px] bg-[#EEF0F5] p-[16px] resize-none  outline-none"
              placeholder={text.inputPlaseholder}
            />
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
                  disabled={isInputEmpty}
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
                disabled={inputValue.length === 0}
                onClick={handleParaphrase}
              >
                <Typography as="span" className="text-[14px]" variant={600}>
                  {text.paraphrase.start}
                </Typography>
              </Button>
            </div>
          )}

          {error && (
            <div className="text-red">
              <Typography>{error.msg}</Typography>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
