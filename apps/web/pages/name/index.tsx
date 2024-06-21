import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { FloatingENSPills } from 'apps/web/src/components/Basenames/FloatingENSPills';
import { RegistrationForm } from 'apps/web/src/components/Basenames/RegistrationForm';
import { UsernamePill } from 'apps/web/src/components/Basenames/UsernamePill';
import {
  UsernameSearchInput,
  UsernameSearchInputVariant,
} from 'apps/web/src/components/Basenames/UsernameSearchInput';
import Modal from 'apps/web/src/components/Modal';
import Tooltip from 'apps/web/src/components/Tooltip';
import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { useInterval } from 'usehooks-ts';

// TODO: This will be replaced by a Lottie file
import { RegistrationContext } from 'apps/web/src/components/Basenames/RegistrationContext';
import tempPendingAnimation from 'apps/web/src/components/Basenames/tempPendingAnimation.png';

export enum ClaimProgression {
  SEARCH,
  CLAIM,
}

const SEARCH_LABEL_COPY_STRINGS = [
  'Set up a community profile.',
  'Connect with Based people.',
  'Get exclusive onchain perks.',
];

const useRotatingText = (strings: string[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length);
  }, 3000);
  return strings[currentIndex];
};

export default function Usernames() {
  const [progress, setProgress] = useState<ClaimProgression>(ClaimProgression.SEARCH);
  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false);
  const toggleModal = useCallback(() => setLearnMoreModalOpen((open) => !open), []);

  const [inputFocused, setInputFocused] = useState(false);
  const [inputHovered, setInputHovered] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  const onFocusLargeUsernameSearchInput = useCallback(() => setInputFocused(true), []);
  const onBlurLargeUsernameSearchInput = useCallback(() => setInputFocused(false), []);
  const onMouseEnterLargeUsernameSearchInput = useCallback(() => setInputHovered(true), []);
  const onMouseLeaveLargeUsernameSearchInput = useCallback(() => setInputHovered(false), []);

  const selectName = useCallback((name: string) => {
    setProgress(ClaimProgression.CLAIM);
    setInputFocused(false);
    setSelectedName(name);
  }, []);

  const rotatingText = useRotatingText(SEARCH_LABEL_COPY_STRINGS);

  // the 96px here accounts for the header height
  const mainClasses = classNames(
    'relative flex min-h-[calc(100vh-96px)] w-full flex-col items-center pb-32 pt-32 px-6',
    'transition-all duration-500',
    {
      'bg-ocsblue text-white': inputFocused,
      'bg-white text-black': !inputFocused,
    },
  );

  const pillWrapperClasses = classNames(
    'transition-all duration-500 mx-auto absolute top-0 -translate-x-1/2 left-1/2 z-20 ',
    {
      'max-w-[5rem] opacity-0 pointer-events-none overflow-hidden':
        progress === ClaimProgression.SEARCH,
      'max-w-full opacity-1': progress === ClaimProgression.CLAIM,
    },
  );

  const smallUsernameInputWrapperClasses = classNames(
    'absolute top-0 z-10 transition-all duration-500 w-full mx-auto transform  left-1/2 -translate-x-1/2 z-30',
    'max-w-[20rem]',
    {
      'opacity-1 -translate-y-12': progress === ClaimProgression.CLAIM,
      'pointer-events-none opacity-0 translate-y-0': progress === ClaimProgression.SEARCH,
    },
  );

  const largeUsernameInputWrapperClasses = classNames(
    'relative z-10 transition-all w-full mx-auto max-w-[36rem] duration-500',
    {
      'opacity-1': progress === ClaimProgression.SEARCH,
      'pointer-events-none opacity-0 max-w-[5rem]': progress === ClaimProgression.CLAIM,
    },
  );

  const basenameBrandingClasses = classNames(
    'relative mb-4 flex items-center justify-between max-w-[36rem] mx-auto',
    'z-10',
    {
      'opacity-1': progress === ClaimProgression.SEARCH,
      'pointer-events-none opacity-0': progress === ClaimProgression.CLAIM,
    },
  );

  const floatingPillsContainerclasses = classNames('transition-opacity duration-500', {
    'opacity-1': progress === ClaimProgression.SEARCH,
    'pointer-events-none opacity-0': progress === ClaimProgression.CLAIM,
  });

  const pendingAnimationClasses = classNames(
    'pointer-events-none absolute inset-0 w-full h-full bg-cover bg-center',
    'transition-all duration-500',
    {
      'opacity-1': progress === ClaimProgression.CLAIM,
      'pointer-events-none opacity-0': progress === ClaimProgression.SEARCH,
    },
  );

  const registrationWrapperClasses = classNames(
    ' w-full max-w-[50rem] transition-all duration-500 mx-auto',
    {
      'opacity-1': progress === ClaimProgression.CLAIM,
      'opacity-0': progress === ClaimProgression.SEARCH,
    },
  );

  const registrationValue = useMemo(
    () => ({ focused: inputFocused, hovered: inputHovered }),
    [inputFocused, inputHovered],
  );

  return (
    <>
      <Head>
        <title>Base | Usernames</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      <RegistrationContext.Provider value={registrationValue}>
        <main className={mainClasses}>
          <div className={floatingPillsContainerclasses}>
            <FloatingENSPills />
          </div>
          <div
            className={pendingAnimationClasses}
            style={{ backgroundImage: `url(${tempPendingAnimation.src})` }}
          >
            {/* <Image src={tempPendingAnimation} alt="Pending" /> */}
          </div>
          <div className="relative mt-24 w-full">
            <div className={basenameBrandingClasses}>
              <div className="flex items-center">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <circle
                    cx="7.5"
                    cy="7.5"
                    r="7.5"
                    className={inputFocused ? 'fill-white' : 'fill-ocsblue'}
                  />
                </svg>
                <h1 className="text-xl">BASENAMES</h1>
              </div>

              {SEARCH_LABEL_COPY_STRINGS.map((string) => (
                <Transition
                  as={Fragment}
                  key={string}
                  show={rotatingText === string}
                  enter="transform transition duration-500"
                  enterFrom="opacity-0 -translate-y-4"
                  enterTo="opacity-100 translate-y-0"
                  leave="transform transition duration-500"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-4"
                >
                  <p className="absolute right-0">{string}</p>
                </Transition>
              ))}
            </div>

            <div className={smallUsernameInputWrapperClasses}>
              <UsernameSearchInput
                variant={UsernameSearchInputVariant.Small}
                placeholder="Find another name"
                selectName={selectName}
              />
            </div>
            <div className="relative mb-20">
              <div className={pillWrapperClasses}>
                <UsernamePill username={selectedName} />
              </div>
              <div className={largeUsernameInputWrapperClasses}>
                <UsernameSearchInput
                  variant={UsernameSearchInputVariant.Large}
                  placeholder="Search for a name"
                  selectName={selectName}
                  onFocus={onFocusLargeUsernameSearchInput}
                  onBlur={onBlurLargeUsernameSearchInput}
                  onMouseEnter={onMouseEnterLargeUsernameSearchInput}
                  onMouseLeave={onMouseLeaveLargeUsernameSearchInput}
                />
              </div>
            </div>

            <div className={registrationWrapperClasses}>
              <RegistrationForm name={selectedName} />
              <p className="mt-6 text-center">
                unlock your username for free!{' '}
                <button type="button" className="underline" onClick={toggleModal}>
                  learn more
                </button>
              </p>
            </div>
          </div>

          <Modal isOpen={learnMoreModalOpen} onClose={toggleModal} title="Qualify for a free name">
            <p className="mb-6 text-illoblack">
              You will receive your name for free if you connect to a wallet that has{' '}
              <strong>one of the following</strong>
            </p>
            <ul className="mb-5 flex flex-col gap-3 self-start">
              <li className="flex flex-row items-center justify-start">
                <Image
                  src="/images/usernames/coinbase-verification.svg"
                  alt="criteria icon"
                  width={30}
                  height={30}
                  className="mr-3"
                />
                A Coinbase verification{' '}
                <Tooltip content="Verifies you have a valid trading account on Coinbase">
                  <InformationCircleIcon
                    width={12}
                    height={12}
                    className="ml-1 fill-[#89909E] transition-colors hover:fill-darkgray"
                  />
                </Tooltip>
              </li>
              <li className="flex flex-row items-center justify-start">
                <Image
                  src="/images/usernames/coinbase-one-verification.svg"
                  alt="criteria icon"
                  width={30}
                  height={30}
                  className="mr-3"
                />
                A Coinbase One verification{' '}
                <Tooltip content="Verifies you have an active Coinbase One subscription">
                  <InformationCircleIcon
                    width={12}
                    height={12}
                    className="ml-1 fill-[#89909E] transition-colors hover:fill-darkgray"
                  />
                </Tooltip>
              </li>
              <li className="flex flex-row items-center justify-start">
                <Image
                  src="/images/usernames/sw-verification.svg"
                  alt="criteria icon"
                  width={30}
                  height={30}
                  className="mr-3"
                />
                Deployed a smart wallet{' '}
                <Tooltip content="Smart wallet deployed from Coinbase Wallet">
                  <InformationCircleIcon
                    width={12}
                    height={12}
                    className="ml-1 fill-[#89909E] transition-colors hover:fill-darkgray"
                  />
                </Tooltip>
              </li>
              <li className="flex flex-row items-center justify-start">
                <Image
                  src="/images/usernames/cbid-verification.svg"
                  alt="criteria icon"
                  width={30}
                  height={30}
                  className="mr-3"
                />
                A CB.ID username{' '}
                <Tooltip content="cb.id claimed prior to cutoff date">
                  <InformationCircleIcon
                    width={12}
                    height={12}
                    className="ml-1 fill-[#89909E] transition-colors hover:fill-darkgray"
                  />
                </Tooltip>
              </li>
            </ul>
            <strong className="self-start">
              Don&apos;t have any of these?&nbsp;
              <Link className="underline" href="https://www.coinbase.com/wallet/smart-wallet">
                Deploy a smart wallet
              </Link>
            </strong>
          </Modal>
        </main>
      </RegistrationContext.Provider>
    </>
  );
}