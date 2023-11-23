import './style.css';
import FollowUp from './components/FollowUp';
import PatientsConsult from './components/PatientsConsults';

const consultations = [{ title: 'Pacientes Atendidos', total: 1, type: 'people' }, { title: 'Pacientes em espera', total: 1, type: 'hold' }, { title: 'Total de consultas para Hoje', total: 1, type: 'consult' }]
function LatestConsultations() {
    return (

        <div className="LatestConsultations"  >
            <div>
                {consultations.map((item, index) => (
                    <div style={{ marginBottom: '10px' }}>
                        <FollowUp key={index} title={item.title} total={item.total} type={item.type} />
                    </div>
                ))}
            </div>
            <span className='title' style={{ fontWeight: 'bold' }}> Ultimas consultas</span>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <PatientsConsult style={{ marginBottom: '20px' }} />
                <PatientsConsult style={{ marginBottom: '20px' }} />
                <PatientsConsult style={{ marginBottom: '20px' }} />
            </div>

        </div >
    );
}
export default LatestConsultations;

