import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import Dot from '@/components/Dot';
import logo from '@/icons/smt_logo.png';
import routes from '@/routes';

import { MAX_MOBILE_WIDTH, MAX_SUBTEXT_WIDTH, MAX_TITLE_WIDTH, MAX_WIDTH } from '../helpers';

export default function TitleSection({ isMobile }: { isMobile: boolean }) {
  return isMobile ? (
    <div
      className="flex w-full flex-col items-center justify-center px-4"
      style={{ maxWidth: MAX_MOBILE_WIDTH }}
    >
      <Visual className="mb-16" />
      <Callout isMobile />
    </div>
  ) : (
    <div className="flex w-full items-center justify-between" style={{ maxWidth: MAX_WIDTH }}>
      <Callout />
      <Visual className="" />
    </div>
  );
}

function Callout({ isMobile }: { isMobile?: boolean }) {
  return (
    <div className="flex flex-1 justify-center">
      <div>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          component="h2"
          className="relative"
          maxWidth={MAX_TITLE_WIDTH}
        >
          {!isMobile && <Dot className="absolute" style={{ left: -36, top: 16 }} size={26} />}
          Get your tasks
          <br />
          into shape.
        </Typography>
        <Typography component="p" className="mt-2 text-lg" maxWidth={MAX_SUBTEXT_WIDTH}>
          Organize and track your tasks on a{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://basecamp.com/shapeup"
            className="font-semibold underline"
          >
            Shape Up
          </a>
          -inspired hill chart.
        </Typography>
        <div
          className={`flex ${
            isMobile ? 'flex-col justify-center pl-8' : 'items-center'
          } mt-4 italic text-gray-700`}
        >
          <div className="flex items-center">
            <Dot size={12} className="mx-2" />
            <div>Quick to setup</div>
          </div>
          <div className="flex items-center">
            <Dot size={12} className="mx-2" />
            <div>Simple to use</div>
          </div>
          <div className="flex items-center">
            <Dot size={12} className="mx-2" />
            <Link
              className="font-bold text-gray-700 underline"
              component={RouterLink}
              to={routes.login}
            >
              Sign in to get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Visual({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center ${className}`}>
      <img src={logo} alt="logo" width={350} height={350} />
    </div>
  );
}
