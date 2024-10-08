import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {placeListState} from '../recoil/placeState';
import PlaceName from '../components/place/PlaceName';
import PlaceAddress from '../components/place/PlaceAddress';
import PlaceDescription from '../components/place/PlaceDescription';
import PlaceImages from '../components/place/PlaceImages';
import CommentList from '../components/comment/CommentList';
import CommentForm from '../components/comment/CommentForm';
import {commentListState} from "../recoil/commentState";
import {isModalVisibleState} from "../recoil/modalState";
import Modal from "../components/Modal";
import '../styles/PlaceDetail.css';

interface Comment {
    id: number;
    text: string;
    createdAt: string;
    updatedAt?: string;
}

function PlaceDetail() {
    const {name} = useParams<{ name: string }>();
    const places = useRecoilValue(placeListState);
    const place = places.find((place) => place.name === name);
    const [comments, setComments] = useRecoilState(commentListState);
    const [isModalVisible, setIsModalVisible] = useRecoilState(isModalVisibleState);

    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem(`comments-${name}`) || '[]');
        setComments(storedComments);
    }, [name, setComments]);

    useEffect(() => {
        localStorage.setItem(`comments-${name}`, JSON.stringify(comments));
    }, [comments, name]);

    if (!place) return <div>Loading...</div>;

    const handleAddComment = (text: string) => {
        const newComment: Comment = {
            id: Date.now(),
            text,
            createdAt: new Date().toLocaleString(),
        };
        setComments([newComment, ...comments]);
        setIsModalVisible(false);
    };

    const handleDeleteComment = (commentId: number) => {
        setComments(comments.filter((comment) => comment.id !== commentId));
    };

    const handleUpdateComment = (commentId: number, newText: string) => {
        setComments(
            comments.map((comment) =>
                comment.id === commentId
                    ? { ...comment, text: newText, updatedAt: new Date().toLocaleString() }
                    : comment
            )
        );
    };

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    return (
        <div className="place-detail-container">
            <div className="place-detail-main">
                <div className="image-container">
                    <PlaceImages images={place.images} />
                </div>
                <div className="place-detail-info">
                    <div className="place-name-address">
                        <PlaceName name={place.name} isLink={false} />
                        <PlaceAddress address={place.address} />
                    </div>
                    <div className="place-description">
                        <PlaceDescription description={place.description} />
                    </div>
                </div>
            </div>
            <div className="place-detail-comments">
                <button className="toggle-comment-form-button" onClick={openModal}>
                    댓글 달기
                </button>
                <CommentList comments={comments} onDelete={handleDeleteComment} onUpdate={handleUpdateComment} />
            </div>

            <Modal isVisible={isModalVisible} onClose={closeModal}>
                <CommentForm onAddComment={handleAddComment} />
            </Modal>
        </div>
    );
}

export default PlaceDetail;