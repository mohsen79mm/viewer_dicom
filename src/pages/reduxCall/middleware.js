import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import {getimage} from '../../redux/actions/image';

const middleware = (id) => {
    // console.log('middle : ',id)
    const [getid,setid] = useState(0) ;
    const dispatch = useDispatch();
    dispatch(getimage(id));
};

export default middleware;