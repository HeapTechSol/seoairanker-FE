import type { Meta, StoryObj } from "@storybook/react";

import Button from ".";

import { ADD_ICON } from "@/assets/icons/svgs";

const meta = {
  title: "Button/Button",
  component: Button,
  parameters: {
    layout: "centered",
    controls: {
      exclude: /.*className|.*onClick|.*StartIcon|.*EndIcon|.*borderRadius|.*id/g,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    variant: {
      options: ["filled", "outlined", "text"],
      control: { type: "radio" },
    },
    color: {
      options: ["primary", "secondary", "error", "warning", "info", "success"],
      control: { type: "radio" },
    },
    disabled: {
      options: [true, false],
      control: { type: "radio" },
    },
    loading: {
      options: [true, false],
      control: { type: "radio" },
    },
    onlyIcon: {
      options: [true, false],
      control: { type: "radio" },
    },
    type: {
      options: ["square", "circle", "borderRadius"],
      control: { type: "radio" },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "500px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonWithPrimaryColors: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "primary",
  },
};

export const ButtonWithSecondaryColors: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "secondary",
  },
};

export const ButtonWithErrorColors: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "error",
  },
};

export const ButtonWithWarningColors: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "warning",
  },
};

export const ButtonWithSuccessColors: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "success",
  },
};

export const ButtonWithInfoColors: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "info",
  },
};

export const ButtonWithFullWidth: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "info",
    fullWidth: true,
  },
};

export const ButtonWithOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "outlined",
    color: "primary",
  },
};

export const ButtonWithText: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "text",
    color: "primary",
  },
};

export const ButtonWithDisabled: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "primary",
    disabled: true,
  },
};

export const ButtonWithMediumSize: Story = {
  args: {
    children: "Hello",
    size: "md",
    variant: "filled",
    color: "primary",
    disabled: false,
  },
};

export const ButtonWithMediumSmall: Story = {
  args: {
    children: "Hello",
    size: "sm",
    variant: "filled",
    color: "primary",
    disabled: false,
  },
};

export const ButtonWithLoading: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "primary",
    loading: true,
    disabled: false,
  },
};

export const ButtonWithStartIcon: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "primary",
    disabled: false,
    StartIcon: ADD_ICON,
  },
};

export const ButtonWithEndIcon: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "primary",
    disabled: false,
    EndIcon: ADD_ICON,
  },
};

export const ButtonWithStartIconLoading: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "primary",
    loading: true,
    disabled: false,
  },
};

export const ButtonWithIconOnly: Story = {
  args: {
    size: "lg",
    variant: "filled",
    color: "primary",
    disabled: false,
    onlyIcon: true,
    StartIcon: ADD_ICON,
  },
};

export const ButtonWithPrimaryColorsAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "primary",
    type:'borderRadius'
  },
};

export const ButtonWithSecondaryColorsAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "secondary",
    type:'borderRadius'
  },
};

export const ButtonWithErrorColorsAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "error",
    type:'borderRadius'
  },
};

export const ButtonWithWarningColorsAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "warning",
    type:'borderRadius'
  },
};

export const ButtonWithSuccessColorsAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "success",
    type:'borderRadius'
  },
};

export const ButtonWithInfoColorsAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "info",
    type:'borderRadius'
  },
};

export const ButtonWithFullWidthAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "info",
    fullWidth: true,
    type:'borderRadius'
  },
};

export const ButtonWithOutlinedAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "outlined",
    color: "primary",
    type:'borderRadius'
  },
};

export const ButtonWithTextAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "text",
    color: "primary",
    type:'borderRadius'
  },
};

export const ButtonWithDisabledAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "primary",
    disabled: true,
    type:'borderRadius'
  },
};

export const ButtonWithMediumSizeAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "md",
    variant: "filled",
    color: "primary",
    disabled: false,
    type:'borderRadius'
  },
};

export const ButtonWithMediumSmallAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "sm",
    variant: "filled",
    color: "primary",
    disabled: false,
    type:'borderRadius'
  },
};

export const ButtonWithLoadingAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "primary",
    loading: true,
    disabled: false,
    type:'borderRadius'
  },
};

export const ButtonWithStartIconAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "primary",
    disabled: false,
    StartIcon: ADD_ICON,
    type:'borderRadius'
  },
};

export const ButtonWithEndIconAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "primary",
    disabled: false,
    EndIcon: ADD_ICON,
    type:'borderRadius'
  },
};

export const ButtonWithStartIconLoadingAndBorderRadius: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "filled",
    color: "primary",
    loading: true,
    disabled: false,
    type:'borderRadius'
  },
};

export const ButtonWithIconOnlyAndBorderRadius: Story = {
  args: {
    size: "lg",
    variant: "filled",
    color: "primary",
    disabled: false,
    onlyIcon: true,
    StartIcon: ADD_ICON,
    type:'borderRadius'
  },
};

export const ButtonWithIconOnlyAndWithCircle: Story = {
  args: {
    size: "lg",
    variant: "filled",
    color: "primary",
    disabled: false,
    onlyIcon: true,
    StartIcon: ADD_ICON,
    type:'circle'
  },
};
//////
export const ButtonWithPrimaryColorsAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant:'outlined',
    color: "primary",
    type:'borderRadius'
  },
};

export const ButtonWithSecondaryColorsAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant:'outlined',
    color: "secondary",
    type:'borderRadius'
  },
};

export const ButtonWithErrorColorsAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant:'outlined',
    color: "error",
    type:'borderRadius'
  },
};

export const ButtonWithWarningColorsAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant:'outlined',
    color: "warning",
    type:'borderRadius'
  },
};

export const ButtonWithSuccessColorsAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant:'outlined',
    color: "success",
    type:'borderRadius'
  },
};

export const ButtonWithInfoColorsAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant:'outlined',
    color: "info",
    type:'borderRadius'
  },
};

export const ButtonWithFullWidthAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant:'outlined',
    color: "info",
    fullWidth: true,
    type:'borderRadius'
  },
};

export const ButtonWithOutlinedAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "outlined",
    color: "primary",
    type:'borderRadius'
  },
};

export const ButtonWithTextAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant: "text",
    color: "primary",
    type:'borderRadius'
  },
};

export const ButtonWithDisabledAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant:'outlined',
    color: "primary",
    disabled: true,
    type:'borderRadius'
  },
};

export const ButtonWithMediumSizeAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "md",
    variant:'outlined',
    color: "primary",
    disabled: false,
    type:'borderRadius'
  },
};

export const ButtonWithMediumSmallAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "sm",
    variant:'outlined',
    color: "primary",
    disabled: false,
    type:'borderRadius'
  },
};

export const ButtonWithLoadingAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant:'outlined',
    color: "primary",
    loading: true,
    disabled: false,
    type:'borderRadius'
  },
};

export const ButtonWithStartIconAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant:'outlined',
    color: "primary",
    disabled: false,
    StartIcon: ADD_ICON,
    type:'borderRadius'
  },
};

export const ButtonWithEndIconAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant:'outlined',
    color: "primary",
    disabled: false,
    EndIcon: ADD_ICON,
    type:'borderRadius'
  },
};

export const ButtonWithStartIconLoadingAndOutlined: Story = {
  args: {
    children: "Hello",
    size: "lg",
    variant:'outlined',
    color: "primary",
    loading: true,
    disabled: false,
    type:'borderRadius'
  },
};

export const ButtonWithIconOnlyAndOutlined: Story = {
  args: {
    size: "lg",
    variant:'outlined',
    color: "primary",
    disabled: false,
    onlyIcon: true,
    StartIcon: ADD_ICON,
    type:'borderRadius'
  },
};

export const ButtonWithIconOnlyAndWithOutlined: Story = {
  args: {
    size: "lg",
    variant:'outlined',
    color: "primary",
    disabled: false,
    onlyIcon: true,
    StartIcon: ADD_ICON,
    type:'circle'
  },
};
