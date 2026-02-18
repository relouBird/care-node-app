import type { ThemeTypes } from '@/types/theme.type';

export const LIGHT_CARE_NODE_THEME: ThemeTypes = {
    name: 'LIGHT_CARE_NODE_THEME',
    dark: false,
    variables: {
        'border-color': '#c8f0e3'
    },
    colors: {
        primary: '#13875d',
        secondary: '#e67e22',
        info: '#3498db',
        success: '#27ae60',
        accent: '#3498db',
        warning: '#f39c12',
        error: '#e74c3c',
        lightprimary: '#d5f5ea',
        lightsecondary: '#fdeee5',
        lightsuccess: '#d5f4e6',
        lighterror: '#fadbd8',
        lightwarning: '#fef5e7',
        lightinfo: '#d6eaf8',
        textPrimary: '#2c3e50',
        textSecondary: '#5a6c7d',
        borderColor: '#c8f0e3',
        inputBorder: '#a8e6d1',
        containerBg: '#ffffff',
        background: '#E4FCF4',
        hoverColor: '#f0fdf9',
        transparent: '#ffffff00',
        surface: '#ffffff',
        'on-surface-variant': '#fafffe',
        grey100: '#f0fdf9',
        grey200: '#d5f5ea',
        muted: '#7f8c8d',
        borderline: '#c8f0e3'
    }
};

export const DARK_CARE_NODE_THEME: ThemeTypes = {
    name: 'DARK_CARE_NODE_THEME',
    dark: true,
    variables: {
        'border-color': '#2d4d43'
    },
    colors: {
        primary: '#1ba876',
        secondary: '#eb954d',
        info: '#5dade2',
        success: '#52be80',
        accent: '#5dade2',
        warning: '#f5b041',
        error: '#ec7063',
        lightprimary: '#1f3b33',
        lightsecondary: '#2f2419',
        lightsuccess: '#1a3329',
        lighterror: '#2f1e1c',
        lightwarning: '#2f2819',
        lightinfo: '#1c2d3a',
        textPrimary: '#e8f5f1',
        textSecondary: '#b8d4ca',
        borderColor: '#2d4d43',
        inputBorder: '#3d6254',
        containerBg: '#1a2f29',
        background: '#0d1f1a',
        hoverColor: '#233f36',
        surface: '#1a2f29',
        'on-surface-variant': '#2a4a3f',
        grey100: '#233f36',
        grey200: '#2d4d43',
        muted: '#7f9c92',
        borderline: '#2d4d43'
    }
};
