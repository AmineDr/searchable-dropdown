import type { Meta, StoryObj } from '@storybook/react-vite';

import SelectDropdownField from '../components/SelectDropdownField';

const meta = {
    title: 'Select Dropdown Field',
    component: SelectDropdownField,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SelectDropdownField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Search: Story = {
    args: {
        id: "select-dropdown-field",
        label: "Label",
        withSearch: true,
        withPortal: true,
        labelOnTop: true,
        zIndex: 1000,
        options: [
            {
                label: "test",
                value: "test"
            },
            {
                label: "test1123123123",
                value: "test123"
            }
        ]
    }
}

export const Multiple: Story = {
    args: {
        id: "select-dropdown-field",
        label: "Label",
        multiple: true,
        withPortal: true,
        labelOnTop: true,
        zIndex: 1000,
        options: [
            {
                label: "test",
                value: "test"
            },
            {
                label: "test1123123123",
                value: "test123"
            }
        ]
    }
}

export const Outlined: Story = {
    args: {
        id: "select-dropdown-field",
        label: "Label",
        multiple: true,
        withSearch: true,
        withPortal: true,
        labelOnTop: true,
        outlined: true,
        zIndex: 1000,
        options: [
            {
                label: "test",
                value: "test"
            },
            {
                label: "test1123123123",
                value: "test123"
            }
        ]
    }
}