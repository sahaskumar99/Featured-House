import React from 'react';
import { useParams } from 'react-router-dom';
import House from '.';
import Inquiry from './Inquiry';

const HouseFromQuery = ( {allHouses} ) => {

    const {id} = useParams();

    const house = allHouses.find( (h) =>h.id === parseInt(id));

    if(!house) return <div> House could not be found </div>
    return (
        <Inquiry id={house}></Inquiry>,
        <House house={house}></House>
    );
};

export default HouseFromQuery;