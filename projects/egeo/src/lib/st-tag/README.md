# Tag (Component)

   The tag component allows to display small texts.

## Inputs

| Property  | Type      | Req   | Description                                | Default |
| --------- | --------- | ----- | ------------------------------------------ | ------- |
| tag       | StTagItem | False | Item that contains the tag info            |         |
| class     | String    | False | Classes applied from outside               |         |
| clickable | Boolean   | False | Boolean to specify if tag can be clickable |         |

## Outputs

| Property    | Type    | Description                             |
| ----------- | ------- | --------------------------------------- |
| clickButton | Boolean | Even emitted when right icon is clicked |

## Example


```html
<st-tag [tag]="simpleTag"
      class="small"
      [removable]="true"></st-tag>
```

## Models

*StTagItem* (StTagItem)

```typescript
export class StTagItem {
    id: any;
    text: string;
    icon ? : string;
    bubble ? : string;
    rightIcon ? : string;
    [key: string]: any;
}
```

