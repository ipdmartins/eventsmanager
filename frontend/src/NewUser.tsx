import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import apiConnection from './utils/apiCon';
import 'react-datepicker/dist/react-datepicker.css';

type ModalProps = {
	openModal: boolean;
	seModalStatus: (_active: boolean) => void;
	updateEventsList: () => void;
};

export default function NewUser({
	openModal,
	seModalStatus,
	updateEventsList,
}: ModalProps) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [initialDate, setInitialDate] = useState(new Date());
	const [finalDate, setFinalDate] = useState(new Date());

	const onChange = (dates: any) => {
		setInitialDate(dates[0]);
		setFinalDate(dates[1]);
	};

	const notification = (color: string, message: string) => {
		if (color === 'success') {
			return toast.success(message, { theme: 'colored', toastId: 'successId' });
		} else {
			return toast.error(message, { theme: 'colored', toastId: 'errorId' });
		}
	};

	async function handleFormSave() {
		const initial_date = new Date(initialDate).toISOString();
		const final_date = new Date(finalDate).toISOString();
		const data = {
			name,
			description,
			initial_date,
			final_date,
		};

		try {
			const response = await apiConnection.post('event', data, {
				headers: { 'Content-Type': 'application/json' },
			});

			if (response) {
				console.log(response.data);
				notification('success', 'Event saved with success');
				updateEventsList();
				toggle();
			}
		} catch (error) {
			console.error(error);
			notification('error', 'Problem while creating Event');
		}
	}

	const toggle = () => {
		setOpen(false);
		seModalStatus(false);
		setName('');
		setDescription('');
		setInitialDate(new Date());
		setFinalDate(new Date());
	};

	useEffect(() => {
		if (openModal) {
			setOpen(openModal);
		}
	}, [openModal]);

	return (
		<div
			className={`modal fade ${open ? 'show' : ''}`}
			style={{ display: open ? 'block' : 'none' }}
			tabIndex={1}
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">New Event</h5>
					</div>
					<div className="modal-body">
						<div className="mb-3 row">
							<label className="form-label text-start">Name</label>
							<input
								type="text"
								className="form-control"
								maxLength={32}
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</div>
						<div className="mb-3 row">
							<label className="form-label text-start">Description</label>
							<textarea
								className="form-control"
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
							/>
						</div>
						<div className="mb-3 row">
							<label className="form-label text-start">Select Dates</label>
							<DatePicker
								onChange={onChange}
								selected={initialDate}
								startDate={initialDate}
								endDate={finalDate}
								selectsRange
								monthsShown={2}
								inline
							/>
						</div>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger"
							onClick={() => toggle()}
						>
							Close
						</button>
						<button
							type="button"
							className="btn btn-success"
							onClick={handleFormSave}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
