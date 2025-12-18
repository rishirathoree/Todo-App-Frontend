
import React, { useEffect, useState } from 'react';
import TableFloat from './subcomps/Table';
import Filter from './subcomps/Filter';
import { GetTodos } from '@/stores/slices/todos';
import { useAppDispatch } from '@/stores/stores';

const Catalouge: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(GetTodos({}))
  },[])
  return (
    <div className="space-y-4 py-4">
      <div>
        <Filter searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <TableFloat searchValue={searchValue} />
    </div>
  );
};

export default Catalouge;