#/bin/bash
echo -e $(date "+[%Y-%m-%d %H:%M:%S]")"Starting"
cron=""
for i in $(ls -d */); do

  folder=${i%%/}
  CRON_SCHEDULE=$(printenv ${folder^^} || printenv ${folder})
  if [ -z "${CRON_SCHEDULE}" ]; then
      >&2 echo -ne $(date "+[%Y-%m-%d %H:%M:%S]")" Empty ${folder^^} environment variable\n"
  else
      mkdir "/home/logs/$folder"
      STDOUT_LOC="/home/logs/$folder/log.suc"
      STDERR_LOC="/home/logs/$folder/log.err"
      tty=$(tty)

      cron+="${CRON_SCHEDULE} echo \$(date \"+[%Y-%m-%d %H:%M:%S]\") \"Launching ${folder} process.\" > ${tty}\n"
      cron+="${CRON_SCHEDULE} /usr/local/bin/python3 /home/cron/${folder}/cron.py > ${STDOUT_LOC} 2> ${STDERR_LOC}\n"
  fi

done
echo -ne "$cron" | crontab -
echo -e $(date "+[%Y-%m-%d %H:%M:%S]")" Done\n"
su -c "/usr/sbin/cron -f"
