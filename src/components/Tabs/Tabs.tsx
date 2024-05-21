"use client";

import React, { forwardRef, useState } from "react";
// Components
import Flex, { FlexProps } from "@components/Flex";
// Context
import { TabsContextProvider } from "./TabsContext";
// Types
import { PrismaneProps, PrismaneWithInternal } from "@types";
// Utils
import { cx } from "@utils";

// Internal Components
import TabsList, { TabsListProps } from "./TabsList";
import TabsPanel, { TabsPanelProps } from "./TabsPanel";
import TabsTab, { TabsTabProps } from "./TabsTab";

export { type TabsListProps, type TabsPanelProps, type TabsTabProps };

export type TabsProps = PrismaneProps<
  {
    variant?: "underlined" | "filled";
    defaultValue?: string;
  },
  FlexProps
>;

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      variant = "underlined",
      defaultValue = null,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue);

    return (
      <Flex
        direction="column"
        w="100%"
        h="100%"
        className={cx("PrismaneTabs-root", className, {
          [`PrismaneTabs-root-${variant}`]: true,
        })}
        data-testid="prismane-tabs"
        ref={ref}
        {...props}
      >
        <TabsContextProvider value={{ variant, value, setValue }}>
          {children}
        </TabsContextProvider>
      </Flex>
    );
  }
) as PrismaneWithInternal<
  TabsProps,
  { List: TabsListProps; Panel: TabsPanelProps; Tab: TabsTabProps }
>;

Tabs.List = TabsList;
Tabs.Panel = TabsPanel;
Tabs.Tab = TabsTab;

export default Tabs;
