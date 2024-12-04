import React from 'react';
import { useSearchParams } from 'react-router-dom';
//import { useParams } from 'react-router-dom';

const Home = () => {
  //const { type } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') ?? '';

  console.log('type=>',type)
  return (
    <div>
      home page
    </div>
  );
}

export default Home;
