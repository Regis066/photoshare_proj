import React, {useState, useEffect} from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { client } from '../client';

const randomlmage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'

const UserProfile = () => {
    const [ user, setUser] = useState(null);
    const [ pins, setPins] = useState(null);
    const [ text, setText] = useState('Created');
    const [ activeBtn, setActiveBtn] = useState(' created');

    const navigate = useNavigate();
    const { userId } = useParams();

    useEffe