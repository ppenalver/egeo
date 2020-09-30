# {TITLE} (Component)

   SdsTooltip This component shows an informative pop up over an element

## Inputs

| Property    | Type    | Req   | Description                                              | Default |
| ----------- | ------- | ----- | -------------------------------------------------------- | ------- |
| showArrow   | Boolean | False | when true, arrow icon is displayed                       | false   |
| white       | Boolean | False | when true, tooltip is displayed with white theme         | false   |
| animated    | Boolean | False | when true, tooltip is displayed with an animation        | true    |
| title       | String  | False | Text displayed on tooltip                                | '       |
| margin      | String  | False | Distance between tooltip and text                        | '8px'   |
| showOnClick | Boolean | False | when true, tooltip is displayed when user clicks on text | false   |

## Example


```html
<span sds-tooltip
      id="tooltip-demo"
      title="This is the tooltip activated on click"
      [showOnClick]="showOnClick"
      [white]="whiteTheme"
      [showArrow]="showArrow"
      [placement]="placement"
      [margin]="margin"
      [title]="text"
      [animated]="animated">
Text with tooltip <span class="icon-help2"></span>
</span>
```

## Models

*SdsTooltipPlacement* (SdsTooltipPlacement)

```typescript

 SdsTooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
 
```

