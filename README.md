# Searchable Select Component

Searchable Select component is a library which provides a multi-case select components

## Features
* Searchable
* Handles multiple values selection
* The dropdown can be in document body
* Controlled input
* TailwindCSS

## Usage guide

#### Installation
`npm i git+git@github.com:AmineDr/searchable-dropdown.git#lib`

#### Usage
```tsx
import { SearchableSelect } from "searchable-select"

function App() {
    const handleChange = (values) => console.log("values:", values)
    return <div className="mx-[5%] mt-5">
        <SearchableSelect
            label="label"
            labelOnTop
            withSearch
            onValuesChange={handleChange}
            multiple
            withPortal
            zIndex={1000}
            outlined
            options={[
                {label: "test",value: "test"},
                {label: "test 1",value: "test1"}
            ]}
        />
    </div>
}
```