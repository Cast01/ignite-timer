import { useContext } from 'react';
import { Status, TableContainer } from './style';
import { CycleContext } from '../../../../contexts/CycleListContext';

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
                <td>Há cerca de 2 meses</td>
                <td>
                  <Status statusColor="green">Concluído</Status>
                </td>
              </tr>
            );
          })}
          {/* <tr>
            <td>teste</td>
            <td>minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
          <tr>
            <td>teste</td>
            <td>minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
          <tr>
            <td>teste</td>
            <td>minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
          <tr>
            <td>teste</td>
            <td>minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
          <tr>
            <td>teste</td>
            <td>minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
          <tr>
            <td>teste</td>
            <td>minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
          <tr>
            <td>teste</td>
            <td>minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
          <tr>
            <td>teste</td>
            <td>minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
          <tr>
            <td>teste</td>
            <td>minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
          <tr>
            <td>teste</td>
            <td>minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr>
          <tr>
            <td>teste</td>
            <td>minutos</td>
            <td>Há cerca de 2 meses</td>
            <td>
              <Status statusColor="green">Concluído</Status>
            </td>
          </tr> */}
        </tbody>
      </table>
    </TableContainer>
  );
}
