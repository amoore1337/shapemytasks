import React from 'react';

import { ColorPicker } from 'mui-color';
import tw, { styled } from 'twin.macro';

const StyledContainer = styled.div<{ $size: number }>`
  .muicc-colorpicker-button, .muicc-colorpicker-button div {
    ${tw`m-0`}
    min-width: ${(props: any) => `${props.$size}px`}!important;
    width: ${(props: any) => `${props.$size}px`}!important;
    height: ${(props: any) => `${props.$size}px`}!important;
    border-radius: 100%!important;
  }
`;

// This lib's typedefs are... not the best.
// Hacking around them for now:
type ColorValue = {
  name: string;
  raw: string | number[];
  css: React.CSSProperties;
  format: string;
  hex: string;
  hsl: number[];
  hsv: number[];
  rgb: number[];
  value: number;
}

const colorPalette: { [name: string]: string } = {
  red: '#d32f2f',
  orange: '#de7a00',
  yellow: '#ecbc27',
  green: '#00a68b',
  blue: '#03a9f4',
  purple: '#8913d8',
  pink: '#ff69da',
  gray: '#90a4ae',
  black: '#37474f',
};

type Props = {
  selectedColor: string;
  onChange: (color: string) => void;
  size?: number;
}

export default function DotColorPicker({ selectedColor, onChange, size = 20 }: Props) {
  const handleColorSelection = (color: ColorValue) => {
    onChange(`#${color.hex}`);
  };
  return (
    <StyledContainer $size={size}>
      <ColorPicker
        palette={colorPalette}
        value={selectedColor}
        onChange={(c: any) => handleColorSelection(c)}
        hideTextfield
      />
    </StyledContainer>
  );
}
