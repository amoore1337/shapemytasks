import React, {
  FocusEventHandler, FocusEvent, useCallback, useState,
} from 'react';

import { Fade, Tooltip } from '@mui/material';
import { ColorChangeHandler, TwitterPicker } from 'react-color';

import useOnChildBlur from '@/useOnChildBlur';

const colorPalette = [
  '#d32f2f',
  '#de7a00',
  '#ecbc27',
  '#00a68b',
  '#03a9f4',
  '#8913d8',
  '#ff69da',
  '#90a4ae',
  '#37474f',
];

type Props = {
  selectedColor: string;
  onChange: (color: string) => void;
  size?: number;
}

export default function DotColorPicker({ selectedColor, onChange, size = 20 }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  const handleColorSelection: ColorChangeHandler = (color) => {
    onChange(color.hex);
  };

  const onLoseFocus = () => {
    if (showPicker) {
      setShowPicker(false);
    }
  };

  const handleBlur = useOnChildBlur(onLoseFocus);

  // Adjust for popover arrow offset.
  // I'm sure there's a more programmatic way to do this,
  // but meh, don't want to muck with react-color that much.
  const offset = Math.min(size / 2) - 20;

  return (
    <div className="relative z-10 flex-freeze" style={{ width: size, height: size }} onBlur={handleBlur}>
      <Tooltip title="Edit dot color">
        <button
          className="rounded-full w-full h-full"
          style={{ backgroundColor: selectedColor }}
          type="button"
          aria-label="Pick Color"
          onClick={() => setShowPicker((s) => !s)}
        />
      </Tooltip>
      <Fade in={showPicker} unmountOnExit>
        <div style={{ left: offset, top: size + 6 }} className="absolute">
          <TwitterPicker
            color={selectedColor}
            colors={colorPalette}
            onChangeComplete={handleColorSelection}
            width="285px"
          />
        </div>
      </Fade>
    </div>
  );
}
