#/bin/bash
echo -e "Starting"
for i in $(ls -d */)
do

  folder=${i%%/}
  folder="user"
  CRON_SCHEDULE=$(printenv ${folder^^} || printenv ${folder})

  if [ -z "${CRON_SCHEDULE}" ]
  then
      >&2 echo -ne "Empty ${folder^^} environment variable\n"
  else
      mkdir "/home/cron/logs/$folder"
      STDOUT_LOC="/home/cron/logs/$folder/log.suc"
      STDERR_LOC="/home/cron/logs/$folder/log.err"
      tty=$(tty)
      echo -ne "${CRON_SCHEDULE} echo \$(date \"+[%Y-%m-%d %H:%M:%S]\") \"Launching ${folder} process.\" > ${tty}\n" | crontab -
      echo -ne "${CRON_SCHEDULE} /usr/local/bin/python3 /home/cron/${folder}/cron.py > ${STDOUT_LOC} 2> ${STDERR_LOC}\n" | crontab -
  fi

done
echo -e "Done\n"
# run cron
su -c "/usr/sbin/cron -f"
