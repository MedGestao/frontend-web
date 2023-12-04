import './style.css';
import FollowUp from './components/FollowUp';
import PatientsConsult from './components/PatientsConsults';

function LatestConsultations() {
    const consultations = [{ title: 'Pacientes Atendidos', total: 1, type: 'people' }, { title: 'Pacientes em espera', total: 1, type: 'hold' }, { title: 'Total de consultas para Hoje', total: 1, type: 'consult' }]
    const oldConsults = [{ name: "maria", img: "" }, { name: "jose", img: "" }]
    return (

        <div className="LatestConsultations"  >
            <div>
                {consultations.map((item, index) => (
                    <div style={{ marginBottom: '10px' }}>
                        <FollowUp key={index} title={item.title} total={item.total} type={item.type} />
                    </div>
                ))}
            </div>
            <span className='title' style={{ fontWeight: 'bold' }}> Últimas consultas</span>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {oldConsults.map((consult, index) => (<PatientsConsult key={index} consult={consult} style={{ marginBottom: '20px' }} />))}
            </div>

        </div >
    );
}
export default LatestConsultations;
