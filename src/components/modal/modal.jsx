import './modal.css';



const Modal = props => {

    let dateOfCreate = props.card.createdAt || '';
    const regex = /[TZ]/gm;
    dateOfCreate = dateOfCreate.replace(regex, ' ').slice(0,-5);
    return(
        <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`}>
            <div className='modal__body'>
                <div className='modal__close' onClick={props.onModalClose}>X</div>
                <h2 className='modal__title'>{props.card.title}</h2>
                <hr/>
                <input
                    name="editText"
                    type="text"
                    className='modal__text'
                    placeholder= 'Text must be here...'
                    value={props.editText || ''}
                    onChange={props.handleChange}
                    onKeyPress={props.toggleEditText}
                />
                <p className='modal__dateOfCreate'>{dateOfCreate}</p>
            </div>
        </div>
    )
}

export default Modal