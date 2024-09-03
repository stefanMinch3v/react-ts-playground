import { ComponentPropsWithoutRef } from "react";

// first way
type ButtonProps = {
  el: 'button'
} & ComponentPropsWithoutRef<'button'>;

type AnchorProps = {
  el: 'anchor'
} & ComponentPropsWithoutRef<'a'>;

export default function Button(props : ButtonProps | AnchorProps) {
  if (props.el === 'anchor') {
    return <a className="button" {...props}></a>
  }

  return (
    <button className="button" {...props}></button>
  );
}

// second way of doing it
type ButtonProps2 = ComponentPropsWithoutRef<'button'> & {
  href?: never;
};

type AnchorProps2 = ComponentPropsWithoutRef<'a'> & {
  href?: string;
};

function isAnchorProps(props: ButtonProps2 | AnchorProps2) : props is AnchorProps2 {
  return 'href' in props;
}
 // export default function !
export function Button2(props : ButtonProps2 | AnchorProps2) {
  if (isAnchorProps(props)) {
    return <a className="button" {...props}></a>
  }

  return (
    <button className="button" {...props}></button>
  );
}