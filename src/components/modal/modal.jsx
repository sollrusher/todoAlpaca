import './modal.css';



const Modal = props => {


    return(
        <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`}>
            <div className='modal__body'>
                <div className='modal__close' onClick={props.onModalClose}>X</div>
                <h2>{props.card.title}</h2>
                <hr/>
                <input
                    name="editText"
                    type="text"
                    placeholder= 'Text must be here...'
                    value={props.editText || ''}
                    onChange={props.handleChange}
                    onKeyPress={props.toggleEditText}
                />
                {props.card.createdAt}
            </div>
        </div>
    )
}

export default Modal