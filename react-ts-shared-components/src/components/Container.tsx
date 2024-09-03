import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T,
  children: ReactNode
} & ComponentPropsWithoutRef<T>;

export default function Container<U extends ElementType>({ as, children, ...props} : ContainerProps<U>) {
  const Component = as || 'div';

  return (
    <Component className="container" {...props}>{children}</Component>
  );
}