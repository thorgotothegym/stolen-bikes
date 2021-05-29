import React, {useState} from 'react';
import { Input, TimePicker, DatePicker, Space, Button } from "antd";
const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

interface ISearch {
    title: string;
}

export const Search = () => {
    const [query, setQuery] = useState<string>('');
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setQuery(enteredName);
      };
    
      const onSearch = (query:string) => {
          alert(query)
      }
  return (
    <div className="search">
      <Space direction="horizontal" size={12}>
      <Input size="small" placeholder="small size" value={query}
          onChange={inputHandler}/>
          <pre>{query}</pre>
        <RangePicker />
<Button type="primary" onClick={ () => {onSearch(query)}} > search </Button>
      </Space>
      ,
    </div>
  );
};
