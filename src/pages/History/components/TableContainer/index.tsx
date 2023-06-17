import { useContext } from 'react';
import { Status, TableContainer } from './style';
import { CycleContext } from '../../../../contexts/CycleListContext';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function TableContainerComponent() {
  const { cycles } = useContext(CycleContext);

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Início</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cycles.map((cycle) => {
            return (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  <Status
                    statusColor={
                      cycle.finishedDate === 'finished'
                        ? 'green'
                        : cycle.finishedDate === 'canceled'
                        ? 'red'
                        : 'yellow'
                    }
                  >
                    {cycle.finishedDate === 'finished' && 'concluído'}
                    {cycle.finishedDate === 'canceled' && 'interrompida'}
                    {cycle.finishedDate === 'pending' && 'em andamento'}
                  </Status>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
}
