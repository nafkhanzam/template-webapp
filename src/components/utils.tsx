type BSProps = {w?: number; h?: number; px?: boolean};

const getSizeStr = (size: number, props: Omit<BSProps, "w" | "h">) => {
  if (props.px) {
    return `${size}px`;
  } else {
    return `${size * 0.25}rem`;
  }
};

export const BS: React.FC<BSProps> = (props) => {
  return (
    <div
      style={{
        width: props.w ? getSizeStr(props.w, props) : undefined,
        height: props.h ? getSizeStr(props.h, props) : undefined,
      }}
    />
  );
};
