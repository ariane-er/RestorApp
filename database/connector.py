from sqlalchemy import create_engine, func
from sqlalchemy.ext.declarative import declarative_base, DeclarativeMeta
from sqlalchemy.orm import sessionmaker
import json

#Create class manager, which will handle the database.
class Manager:
    Base = declarative_base()
    session = None

    #Create function which will create the database.
    def create_engine(self):
        engine = create_engine("sqlite:///C:\\Users\\arian\\Documents\\UTEC\\Desarrollo Basado en Plataformas\\RestorApp\\database\\midb.db?check_same_thread=False", echo=True)
        self.Base.metadata.create_all(engine)
        return engine

    #Create function which will get our session within the database.
    def get_session(self, engine):
        if self.session == None: #We check that there's not an open session
            Session = sessionmaker(bind=engine)
            session = Session()
        return session

class AlchemyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data)
                    fields[field] = data
                except TypeError:
                    fields[field] = None

            return fields

        return json.JSONEncoder.default(self, obj)

