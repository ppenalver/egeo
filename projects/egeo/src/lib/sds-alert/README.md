# Alerts (Component)

   Alerts are made to let the user know errors or information about he is trying to do.

## Inputs

| Property   | Type       | Req   | Description                                 | Default |
| ---------- | ---------- | ----- | ------------------------------------------- | ------- |
| isDisabled | IsDisabled | False | If true, disables animation and positioning | false'  |
| hotRender  | HotRender  | False | If true, enables hot render                 | false'  |
| config     | Config     | False | Alert's config                              | {}'     |

## Outputs

| Property     | Type      | Description                                    |
| ------------ | --------- | ---------------------------------------------- |
| EventEmitter | AutoClose | Event emitted when user clicks on close icon   |
| EventEmitter | Close     | Event emitted when alert was closed by timeout |

## Example


```html
<sds-alert [showInConsole]="true"></sds-alert>
```

## Models

*Alert* (StAlert)

```typescript

```

