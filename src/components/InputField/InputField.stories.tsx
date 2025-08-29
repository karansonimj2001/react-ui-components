import type { Meta, StoryObj } from '@storybook/react'
// import { fn } from '@storybook/test'
import { InputField } from './InputField'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
  args: {
    onChange: () => {},
    placeholder: 'Enter text...',
  },
}

export default meta
type Story = StoryObj<typeof InputField>

export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter your text here',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Input with Helper Text',
    helperText: 'This is some helpful information',
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Input with Error',
    errorMessage: 'This field is required',
    invalid: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    value: 'Disabled text',
  },
}

export const FilledVariant: Story = {
  args: {
    label: 'Filled Variant',
    variant: 'filled',
  },
}

export const GhostVariant: Story = {
  args: {
    label: 'Ghost Variant',
    variant: 'ghost',
  },
}

export const SmallSize: Story = {
  args: {
    label: 'Small Input',
    size: 'sm',
  },
}

export const LargeSize: Story = {
  args: {
    label: 'Large Input',
    size: 'lg',
  },
}

export const PasswordWithToggle: Story = {
  args: {
    label: 'Password',
    type: 'password',
    showPasswordToggle: true,
  },
}

export const WithClearButton: Story = {
  args: {
    label: 'Input with Clear',
    value: 'Some text',
    showClearButton: true,
  },
}

export const DarkTheme: Story = {
  args: {
    label: 'Dark Theme Input',
    theme: 'dark',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#333333' },
      ],
    },
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField
        label="Outlined (Default)"
        variant="outlined"
        placeholder="Outlined input"
      />
      <InputField
        label="Filled"
        variant="filled"
        placeholder="Filled input"
      />
      <InputField
        label="Ghost"
        variant="ghost"
        placeholder="Ghost input"
      />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField
        label="Small"
        size="sm"
        placeholder="Small input"
      />
      <InputField
        label="Medium (Default)"
        size="md"
        placeholder="Medium input"
      />
      <InputField
        label="Large"
        size="lg"
        placeholder="Large input"
      />
    </div>
  ),
}
