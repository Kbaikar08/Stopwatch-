 let startTime;
    let elapsedTime = 0;
    let timerInterval;

    function printTime(time) {
      const formattedTime = new Date(time).toISOString().substr(11, 8); // Adjusted to exclude milliseconds
      document.querySelector('.time').textContent = formattedTime;
    }

    function start() {
      if (!startTime) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function printElapsedTime() {
          elapsedTime = Date.now() - startTime;
          printTime(elapsedTime);
        }, 10);
      }
    }

    function pause() {
      clearInterval(timerInterval);
      startTime = null;
    }

    function reset() {
      clearInterval(timerInterval);
      startTime = null;
      elapsedTime = 0;
      printTime(elapsedTime);
      document.getElementById('lapList').innerHTML = '';
    }

    function lap() {
      if (startTime) {
        const lapTime = new Date(elapsedTime).toISOString().substr(11, 8); // Adjusted to exclude milliseconds
        const lapList = document.getElementById('lapList');
        
        // Create a new table if it doesn't exist
        if (!lapList.querySelector('table')) {
          const table = document.createElement('table');
          table.innerHTML = '<tr><th>Lap</th><th>Lap Time</th><th>Total Time</th></tr>';
          lapList.appendChild(table);
        }
        
        // Calculate lap number
        const lapNumber = lapList.querySelectorAll('tr').length;

        // Create a new row for lap data
        const lapRow = document.createElement('tr');

        // Create lap number cell
        const lapNumberCell = document.createElement('td');
        lapNumberCell.textContent = lapNumber;

        // Create lap time cell
        const lapTimeCell = document.createElement('td');
        lapTimeCell.textContent = lapTime;

        // Create total time cell
        const totalTimeCell = document.createElement('td');
        totalTimeCell.textContent = document.querySelector('.time').textContent;

        // Append cells to the row
        lapRow.appendChild(lapNumberCell);
        lapRow.appendChild(lapTimeCell);
        lapRow.appendChild(totalTimeCell);

        // Append row to the table
        lapList.querySelector('table').appendChild(lapRow);
      }
    }

    document.getElementById('start').addEventListener('click', start);
    document.getElementById('pause').addEventListener('click', pause);
    document.getElementById('reset').addEventListener('click', reset);
    document.getElementById('lap').addEventListener('click', lap);