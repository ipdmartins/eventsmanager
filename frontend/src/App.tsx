import DataTable, { TableColumn } from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import apiConnection from './utils/apiCon';
import NewUser from './NewUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style/App.css';

type TableProps = {
	name: string;
	description: string;
	initial_date: string;
	final_date: string;
};

function App() {
	const [inputSearch, setInputSearch] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [dataTableCurrentEvents, setDataTableCurrentEvents] = useState([]);
	const [filterdataTableCurrentEvents, setFilterDataTableCurrentEvents] =
		useState([]);

	const changeModalStatus = (status: boolean) => {
		setOpenModal(status);
	};

	const headerColumns: TableColumn<TableProps>[] = [
		{
			name: 'Event',
			sortable: true,
			selector: (row) => row.name || '',
		},
		{
			name: 'Description',
			selector: (row) => row.description || '',
		},
		{
			name: 'Start date',
			selector: (row) => new Date(row.initial_date).toLocaleDateString() || '',
		},
		{
			name: 'Final date',
			selector: (row) => new Date(row.final_date).toLocaleDateString() || '',
		},
	];

	async function searchByParameter(search: string) {
		const tolowercase = search.toLocaleLowerCase();

		const filter = filterdataTableCurrentEvents.filter((el) => {
			return Object.values(el).some((val) =>
				String(val).toLocaleLowerCase().includes(tolowercase)
			);
		});

		setDataTableCurrentEvents(filter);
	}

	async function getCurrentEvents() {
		try {
			const resp = await apiConnection.get('event');

			if (resp) {
				console.log(resp.data);
				setDataTableCurrentEvents(resp.data);
				setFilterDataTableCurrentEvents(resp.data);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getCurrentEvents();
	}, []);

	return (
		<div className="main ">
			<h3 className="text-light">Event Manager</h3>
			<div className="headerInputSearch mt-5">
				<div className="row">
					<div className="col-md-9">
						<div className="input-group">
							<span className="input-group-text" id="basic-addon1">
								<MdSearch />
							</span>
							<input
								type="text"
								className="form-control"
								placeholder="Search for an event"
								aria-label="Username"
								aria-describedby="basic-addon1"
								value={inputSearch}
								onChange={(e) => {
									searchByParameter(e.target.value);
									setInputSearch(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="col-md-3">
						<button
							type="button"
							className="btn btn-light"
							onClick={() => setOpenModal(true)}
						>
							New event
						</button>
					</div>
				</div>
			</div>
			<div className="mt-3">
				<DataTable
					columns={headerColumns}
					data={dataTableCurrentEvents}
					pointerOnHover
					highlightOnHover
					className="dataTableStyle"
					theme={'dark'}
				/>
			</div>
			<NewUser
				openModal={openModal}
				seModalStatus={changeModalStatus}
				updateEventsList={getCurrentEvents}
			/>
		</div>
	);
}

export default App;
