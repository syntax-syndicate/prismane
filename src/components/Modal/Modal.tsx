"use client";

import React, { forwardRef, useEffect } from "react";
// Components
import Paper, { PaperProps } from "@components/Paper";
import Animation, { AnimationProps } from "@components/Animation";
import Backdrop from "@components/Backdrop";
import Portal from "@components/Portal";
// Hooks
import useAnimation from "@hooks/useAnimation";
import usePresence from "@hooks/usePresence";
import useKeyboardShortcut from "@hooks/useKeyboardShortcut";
// Context
import { ModalContextProvider } from "./ModalContext";
// Types
import { PrismaneProps, PrismaneWithInternal } from "@types";
// Utils
import { strip, fr } from "@utils";

// Internal Components
import ModalHeader, { ModalHeaderProps } from "./ModalHeader";
import ModalFooter, { ModalFooterProps } from "./ModalFooter";

export { type ModalHeaderProps, type ModalFooterProps };

export type ModalProps = PrismaneProps<
  {
    open?: boolean;
    closable?: boolean;
    onClose?: () => void;
  },
  AnimationProps & PaperProps
>;

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      closable,
      onClose = () => {},
      shadow,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { animate, animating, duration, timing } = useAnimation(
      open as boolean
    );

    const presence = usePresence(open as boolean, duration, animate);

    useKeyboardShortcut(["escape"], onClose, open);

    useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }, [open]);

    return (
      <Portal>
        {presence && (
          <Animation
            as={Backdrop}
            animation="fade"
            animated={animating}
            duration={duration}
            timing={timing}
            onClick={onClose}
          >
            <Animation
              as={Paper}
              p={fr(5)}
              shadow={shadow}
              animation="scale"
              animated={animating}
              duration={duration}
              timing={timing}
              onClick={(e: any) => {
                e.stopPropagation();
              }}
              className={strip(
                `${className ? className : ""} ${
                  open ? "PrismaneModal-root-open" : ""
                } PrismaneModal-root`
              )}
              data-testid="prismane-modal"
              ref={ref}
              {...props}
            >
              <ModalContextProvider value={{ open, closable, onClose }}>
                {children}
              </ModalContextProvider>
            </Animation>
          </Animation>
        )}
      </Portal>
    );
  }
) as PrismaneWithInternal<
  ModalProps,
  { Header: ModalHeaderProps; Footer: ModalFooterProps }
>;

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

export default Modal;
