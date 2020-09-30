# Radio (Component)

   The radio component is used normally in a form acting as the standard html radio input but also user can use it out of a form like a template driven form.

## Inputs

| Property | Type    | Req   | Description                         | Default                |
| -------- | ------- | ----- | ----------------------------------- | ---------------------- |
| id       | String  | False | Input Id value                      | 'sds-radio-<unique id>' |
| qaTag    | String  | False | Id value for qa test                | 'sds-radio-<unique id>' |
| name     | String  | False | Input name value                    | ''                     |
| checked  | Boolean | False | Boolean to check the radio button   | ''                     |
| disabled | Boolean | False | Boolean to disable the radio button | ''                     |
| value    | Boolean | False | Value of the radio button           | ''                     |

## Outputs

| Property | Type    | Description                                  |
| -------- | ------- | -------------------------------------------- |
| change   | Boolean | Boolean emitted when radio button is changed |

## Example


```html
<sds-radio-group class="radio-inline">
    <sds-radio value="1">Enabled</sds-radio>
    <sds-radio value="2"
          [disabled]="true">Disabled</sds-radio>
    <sds-radio value="2"
          [checked]="true"
          [disabled]="true">Disabled checked</sds-radio>
</sds-radio-group>
```

