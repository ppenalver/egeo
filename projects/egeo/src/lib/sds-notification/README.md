# Notification (Component)

   Notification is made to let the user know info about a process she is performing in real time.

## Inputs

| Property      | Type                         | Req   | Description                                                                                                                                     | Default |
| ------------- | ---------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| hotRender     | Boolean                      | False | When true the notification is shown as a demo                                                                                                             | false   |
| config        | StNotificationDisplayOptions | False | The notification's config 


## Outputs

| Property | Type              | Description                                  |
| -------- | ----------------- | -------------------------------------------- |
| close    | EventEmitter      | Event emitted when user click in close icon |
| autoClose| EventEmitter      | Event emitted when notification is closed by timeout         |

## Example


```html
<sds-notification 
  [config]="config"
  [hotRender]="false">
</sds-notification>
```

