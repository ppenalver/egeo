export enum SdsButtonIconType {
   ICON_LEFT = 'icon-left',
   ICON_RIGHT = 'icon-right',
   ONLY_ICON = 'only-icon'
}

export enum SdsButtonSize {
   REGULAR = 'regular',
   SMALL = 'small'
}

export enum SdsButtonType {
   PRIMARY = 'primary',
   SECONDARY = 'secondary',
   BORDERLESS = 'borderless',
   CRITICAL = 'critical'
}

export interface SdsButtonConfig {
   text?: string;
   size?: SdsButtonSize;
   type?: SdsButtonType;
   iconType?: SdsButtonIconType;
   icon?: string;
   showSpinner?: boolean;
}
