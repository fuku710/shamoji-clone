FROM python:3

ENV FLASK_APP=shamoji
ENV FLASK_ENV=development

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["flask","run","-h","0.0.0.0"]